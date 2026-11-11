const SELECTED_LAPORAN_KEY = "lapordesa_selected_laporan";

export function selectLaporan(id: string | number) {
  sessionStorage.setItem(SELECTED_LAPORAN_KEY, String(id));
}

export function getSelectedLaporan() {
  return sessionStorage.getItem(SELECTED_LAPORAN_KEY);
}
