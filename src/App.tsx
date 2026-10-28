import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import Home from '@/pages/Home';
import AiToolbox from '@/pages/AiToolbox';
import DevToolbox from '@/pages/DevToolbox';
import MyBox from '@/pages/MyBox';
import NotFound from '@/pages/NotFound';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="mybox"
            element={
              <PageTransition>
                <MyBox />
              </PageTransition>
            }
          />
          <Route
            path="aitoolbox"
            element={
              <PageTransition>
                <AiToolbox />
              </PageTransition>
            }
          />
          <Route
            path="devtoolbox"
            element={
              <PageTransition>
                <DevToolbox />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
