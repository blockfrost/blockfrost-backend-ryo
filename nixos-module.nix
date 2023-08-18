{config, pkgs, lib, ...}: let
  cfg = config.services.blockfrost;
  settingsFormat = pkgs.formats.json {};
in {
   options = {
    services.blockfrost  = {
      enable = lib.mkEnableOption "Blockfrost";
      package = lib.mkOption {
        type = lib.types.package;
        default = pkgs.blockfrost-backend-ryo;
      };
      stateDir = lib.mkOption {
        type = lib.types.path;
        default = "${cfg.baseWorkDir}blockfrost";
      };
      user = lib.mkOption {
        description = "User to run blockfrost service as";
        type = lib.types.str;
        default = "blockfrost";
      };
      group = lib.mkOption {
        description = "Group to run blockfrost service as";
        type = lib.types.str;
        default = "blockfrost";
      };
      settings = lib.mkOption {
        type = lib.types.submodule {
          freeformType = settingsFormat.type;
          options = {
            server = {
              listenAddress = lib.mkOption {
                type = lib.types.str;
                default = "localhost";
              };
              port = lib.mkOption {
                type = lib.types.port;
                default = 3000;
              };
              debug = lib.mkOption {
                type = lib.types.bool;
                default = false;
              };
              prometheusMetrics = lib.mkOption {
                type = lib.types.bool;
                default = false;
              };
            };
            dbSync = {
              host = lib.mkOption {
                type = lib.types.str;
                default = "localhost";
              };
              port = lib.mkOption {
                type = lib.types.port;
                default = 5432;
              };
              user = lib.mkOption {
                type = lib.types.str;
                default = "cexplorer";
              };
              database = lib.mkOption {
                type = lib.types.str;
                default = "cdbsync";
              };
              maxConnections = lib.mkOption {
                type = lib.types.int;
                default = 10;
              };
            };
            network = lib.mkOption {
              type = lib.types.enum [ "mainnet" "preprod" "preview" "testnet" ];
              default = "mainnet";
            };
            tokenRegistryUrl = lib.mkOption {
              type = lib.types.str;
              default = "https://tokens.cardano.org";
            };
          };
        };
        default = {};
        description = ''
          Freeform attrset that generates the JSON configuration file used by Blockfrost.
         '';
        example = ''
          {
            user = config.services.cardano-db-sync.postgres.user;
            port = config.services.cardano-db-sync.postgres.port;
            database = config.services.cardano-db-sync.postgres.database;
            host = config.services.cardano-db-sync.postgres.socketdir;
          }
        '';
      };
      baseWorkDir = lib.mkOption {
        type = lib.types.path;
        default = "/var/lib/";
        internal = true;
      };
      requires = lib.mkOption {
        type = lib.types.listOf lib.types.str;
        default = [ "cardano-db-sync.service" ];
        internal = true;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    users.users.blockfrost = lib.mkIf (cfg.user == "blockfrost") {
      isSystemUser = true;
      group = cfg.group;
      home = cfg.stateDir;
    };
    users.groups.blockfrost = lib.mkIf (cfg.group == "blockfrost") { };

    systemd.tmpfiles.rules = [
      "d /var/lib/blockfrost-backend-ryo 770 ${cfg.user} ${cfg.group}"
    ];

    systemd.services.blockfrost-backend-ryo = {
      inherit (cfg) requires;
      wantedBy = [ "multi-user.target" ];
      environment = {
        NODE_CONFIG_RUNTIME_JSON = settingsFormat.generate "blockfrost-settings.json" cfg.settings;
        HOME = "/var/lib/blockfrost-backend-ryo";
      };
      serviceConfig = {
        ExecStart = "${cfg.package}/bin/blockfrost-backend-ryo";
        Group = cfg.group;
        User = cfg.user;
        StateDirectory = lib.removePrefix cfg.baseWorkDir cfg.stateDir;
        WorkingDirectory = cfg.stateDir;
      };
    };
  };
}
