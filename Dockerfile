FROM nixos/nix
COPY . /app
WORKDIR /app
# Build once via the flake; `-o result` leaves a symlink to the store output we run from.
RUN nix --extra-experimental-features 'nix-command flakes' build .#blockfrost-backend-ryo -o result
ENTRYPOINT ["/app/result/bin/blockfrost-backend-ryo"]
EXPOSE 3000
