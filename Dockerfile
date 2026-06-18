FROM nixos/nix
COPY . /app
WORKDIR /app
# Build once; `-o result` leaves a symlink to the store output we run from.
RUN nix-build -A blockfrost-backend-ryo -o result
ENTRYPOINT ["/app/result/bin/blockfrost-backend-ryo"]
EXPOSE 3000
