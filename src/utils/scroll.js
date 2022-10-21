const HEADER_HEIGHT = 187;

export const scrollToTop = () => {
  window.scrollTo({
    top: HEADER_HEIGHT,
    behavior: 'smooth',
  });
};
