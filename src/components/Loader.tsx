import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="17" rx="0" ry="0" width="200" height="106" />
    <rect x="5" y="137" rx="0" ry="0" width="158" height="12" />
  </ContentLoader>
)

export default MyLoader
