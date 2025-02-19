export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export function generateProductImageSrcSet(url: string): string {
  const sizes = [300, 400, 600, 800, 1200];
  return sizes
    .map((size) => \`\${url}&width=\${size} \${size}w\`)
    .join(', ');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return \`\${text.slice(0, maxLength)}...\`;
}

export function getSizedImageUrl(url: string, size: number): string {
  return \`\${url}&width=\${size}\`;
}

export function getVariantOptionValue(
  variant: any,
  optionName: string
): string | null {
  const option = variant.selectedOptions?.find(
    (opt: any) => opt.name === optionName
  );
  return option ? option.value : null;
}

export function createMetaTitle(title: string, suffix = 'Digital Products'): string {
  return \`\${title} | \${suffix}\`;
}

export function createMetaDescription(text: string, maxLength = 160): string {
  return truncateText(text.replace(/\\s+/g, ' ').trim(), maxLength);
}
