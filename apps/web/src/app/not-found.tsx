import { Container, Section } from "@/components/layout";
import { LocaleLink, LocalizedText } from "@/features/localization";

export default function NotFound() {
  return (
    <Section tone="warm" className="application-state" aria-labelledby="not-found-title">
      <Container size="reading">
        <p className="page-eyebrow"><LocalizedText en="404 · Page not found" ar="404 · الصفحة غير موجودة" /></p>
        <h1 id="not-found-title"><LocalizedText en="This page is not in the catalogue." ar="هذه الصفحة غير موجودة في الكتالوج." /></h1>
        <p><LocalizedText en="The address may have changed, or the requested product is no longer listed at this path." ar="ربما تغير العنوان، أو لم يعد المنتج المطلوب مدرجًا في هذا المسار." /></p>
        <div className="application-state__actions">
          <LocaleLink className="button button--primary button--standard" href="/products"><LocalizedText en="Browse products" ar="استعرض المنتجات" /></LocaleLink>
          <LocaleLink className="button button--secondary button--standard" href="/contact"><LocalizedText en="Contact Rosa" ar="اتصل بروزا" /></LocaleLink>
        </div>
      </Container>
    </Section>
  );
}
