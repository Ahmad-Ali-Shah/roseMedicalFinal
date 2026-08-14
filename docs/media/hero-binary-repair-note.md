# Hero binary repair note

The semantic hero renderer is correct, but the `client-v4` WebP blobs committed during an interrupted upload are abnormally small and must not be used as production masters. The homepage should use complete direct raster derivatives of the four user-supplied monochrome banner images, with mobile crops, rather than raster-in-SVG wrappers or truncated WebPs.
