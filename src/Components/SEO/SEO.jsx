/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const SITE_URL = 'https://portfolio-react-theta-steel.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/projects/portfilo_react.jpg`;
const DEFAULT_TITLE = 'Syed Farman Ali | MERN, Python & ML Engineer | Gangoo, Pulwama, Jammu & Kashmir';
const DEFAULT_DESCRIPTION = 'Official portfolio of Syed Farman Ali: Full-stack MERN, React Native & Python engineer based in Gangoo, Pulwama, Jammu & Kashmir. Collaborator with SKUAST-Kashmir and NIT in AI/ML & IoT.';

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrValue] = selector.match(/\[(name|property)="(.+)"\]/).slice(1);
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  robots = 'index, follow',
  image = DEFAULT_IMAGE,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();

    document.title = title;
    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', robots);
    setMeta('meta[name="googlebot"]', 'content', robots);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
  }, [description, image, path, robots, title]);

  return null;
}
