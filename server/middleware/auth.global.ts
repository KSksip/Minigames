export default eventHandler(async (event) => {
  const session = await getUserSession(event)
  const runtimeConfig = useRuntimeConfig()

  

  for(const subStr in runtimeConfig.protectedRoutes){
    if(event.node.req.url?.includes(runtimeConfig.protectedRoutes[subStr]) && !session.user){
      return sendRedirect(event, '/login')
    }
  }
})