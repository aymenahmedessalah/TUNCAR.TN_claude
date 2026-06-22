import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

/**
 * Resolves a dotted path like "checkout.steps.payment" against a
 * translation namespace object. Falls back to the key itself if missing,
 * so a missing translation never breaks the UI — it just shows the raw key.
 */
function resolvePath(namespace, path) {
  const value = path.split(".").reduce((acc, segment) => (acc ? acc[segment] : undefined), namespace);
  return value ?? path;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  const dictionary = translations[lang];
  const dir = dictionary.dir;

  // Keep the <html> element's lang/dir attributes in sync with the
  // active language, so the whole document (not just React content)
  // respects RTL/LTR layout.
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang, dir]);

  const t = useMemo(() => {
    return (path) => resolvePath(dictionary, path);
  }, [dictionary]);

  const value = { lang, setLang, dir, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
