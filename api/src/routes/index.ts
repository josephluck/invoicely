export default function(server: any, db: any) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function() {
      return db.get.users()
    },
  })
}
