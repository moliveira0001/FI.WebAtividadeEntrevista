using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public List<DML.Beneficiario> Listar(long Id)
        {            
            
            DAL.DaoBeneficiario be = new DAL.DaoBeneficiario();
            return be.Listar(Id);
        }
    }
}
