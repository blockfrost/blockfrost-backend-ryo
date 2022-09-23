FROM nixos/nix
COPY . /app
WORKDIR /app
RUN nix-build -A blockfrost-backend
RUN ln -s $(nix-build -A blockfrost-backend --no-out-link)/bin/blockfrost-backend /app/blockfrost-backend
EXPOSE 3000
