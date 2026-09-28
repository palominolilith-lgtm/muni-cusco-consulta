export const metadata = {
  title: "Administración | Municipalidad de Cusco",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function AdminLayout({ children }) {
  return children;
}
