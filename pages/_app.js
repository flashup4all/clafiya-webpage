// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'


// const createApolloClient = new ApolloClient({
//     // uri: 'http://localhost:4000/api/graphql',
//     uri: 'https://stimulating-grandiose-asiaticlesserfreshwaterclam.gigalixirapp.com/api/graphql',
  //     uri: 'http://testapi.kasumpcs.com/api/graphql',
  //   cache: new InMemoryCache()
  // });


function MyApp({ Component, pageProps }) {
 const Layout = Component.layout || EmptyLayout
  return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );

//   return (
//     <ApolloProvider client={createApolloClient}>
//       <ToastProvider>
//       <Layout>
//       <Component {...pageProps} />
//     </Layout>
//     </ToastProvider>
//     </ApolloProvider>
//   );

}
const EmptyLayout = ({children}) => <>{children}</>

export default MyApp