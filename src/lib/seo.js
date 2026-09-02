import { siteConfig } from '../config/siteConfig';

/**
 * إضافة البيانات المهيكلة (JSON-LD) لمحركات البحث.
 * Adds Organization + ItemList/Product structured data to the document head.
 */
export function injectStructuredData(products) {
  if (typeof document === 'undefined') return;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Store',
        '@id': `${siteConfig.siteUrl}/#store`,
        name: siteConfig.brandName,
        alternateName: siteConfig.brandNameLatin,
        description: siteConfig.shortDescription,
        url: siteConfig.siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        currenciesAccepted: siteConfig.currency,
        areaServed: 'SA',
        sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl, siteConfig.amazonStoreUrl].filter(
          Boolean,
        ),
      },
      {
        '@type': 'ItemList',
        name: `مجموعة عطور ${siteConfig.brandName}`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            sku: product.sku,
            brand: { '@type': 'Brand', name: product.brand },
            description: product.description,
            image: `${siteConfig.siteUrl}${product.image}`,
            url: `${siteConfig.siteUrl}/?p=${product.slug}`,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: product.currency,
              availability:
                product.availability === 'out_of_stock'
                  ? 'https://schema.org/OutOfStock'
                  : 'https://schema.org/InStock',
            },
          },
        })),
      },
    ],
  };

  const existing = document.getElementById('structured-data');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'structured-data';
  script.textContent = JSON.stringify(graph);
  document.head.appendChild(script);
}
