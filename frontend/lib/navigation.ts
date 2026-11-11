const protectedPaths = ["/dashboard", "/laporan", "/warga", "/pengaturan"];

export function isProtectedPath(path: string) {
  return protectedPaths.some((route) => path === route || path.startsWith(`${route}/`));
}
