import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = "ta";

  return {
    locale,
    messages: (await import(`@app/[lang]/dictionaries/${locale}.json`)).default,
  };
});
