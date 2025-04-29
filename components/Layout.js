import Header from './Header';
import Footer from './Footer';
import PostCardStyles from './PostCardStyles';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <PostCardStyles />
      <main>{children}</main>
      <Footer />
    </>
  );
} 