interface FnType {
  validaRut: (rutCompleto: string) => boolean;
  sanitizeRut: (rut: string) => string;
  dv: (T: number) => string | number;
}

const Fn: FnType = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (run: string): boolean {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(run)) return false;
    const tmp = run.split('-');
    let digv = tmp[1];
    const rut = parseInt(tmp[0], 10);
    if (digv === 'K') digv = 'k';
    return Fn.dv(rut).toString() === digv;
  },
  sanitizeRut: function (rut: string): string {
    return rut.replace(/\./g, '');
  },
  dv: function (T: number): string | number {
    let M = 0, S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'k';
  },
};

export default Fn;
