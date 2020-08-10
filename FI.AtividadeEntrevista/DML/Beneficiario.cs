using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DML
{
    [Serializable]
    public class Beneficiario : Cliente
    {
        public int IdCliente { get; set; }
    }
}
