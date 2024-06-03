import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ page }) => {
  const location = useLocation();
  const {t} = useTranslation()

  useEffect(() => {
    document.title = t(page);
  }, [location, page]);

  return null;
};

export default PageTitle;