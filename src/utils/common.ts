export const registerRoute = (app: FastifyInstance, routeHandler: any) => {
  app.register({
    dir: path.join(__dirname, 'routes/'),
    dirNameRoutePrefix: false,
  });
};
