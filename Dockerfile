FROM nixos/nix
COPY . /app
WORKDIR /app
RUN nix-build -A blockfrost-backend-ryo
RUN ln -s $(nix-build -A blockfrost-backend-ryo --no-out-link)/bin/blockfrost-backend-ryo /app/blockfrost-backend-ryo
ENTRYPOINT ["/app/blockfrost-backend-ryo"]
EXPOSE 3000
