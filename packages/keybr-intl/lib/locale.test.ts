import test from "ava";
import { allLocales, selectLocale } from "./locale.ts";

test("all locales", (t) => {
  for (const id of allLocales) {
    t.notThrows(() => {
      new Intl.Locale(id);
    });
  }
});

test("select preferred locale", (t) => {
  const filter =
    (...found: string[]) =>
    (...locales: string[]): string | null =>
      locales.find((locale) => found.includes(locale)) ?? null;
  t.is(selectLocale(filter()), "en");
  t.is(selectLocale(filter("xx")), "en");
  t.is(selectLocale(filter("en")), "en");
  t.is(selectLocale(filter("en-US")), "en");
  t.is(selectLocale(filter("en-CA")), "en");
  t.is(selectLocale(filter("pt")), "en");
  t.is(selectLocale(filter("pt-BR")), "pt-br");
  t.is(selectLocale(filter("pt-PT")), "en");
  t.is(selectLocale(filter("zh")), "zh-hans");
  t.is(selectLocale(filter("zh-CN")), "zh-hans");
  t.is(selectLocale(filter("zh-TW")), "en");
});
