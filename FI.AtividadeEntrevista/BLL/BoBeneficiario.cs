﻿using System;
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

        public void Excluir(long Id)
        {

            DAL.DaoBeneficiario be = new DAL.DaoBeneficiario();
            be.Excluir(Id);
        }

        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiario be = new DAL.DaoBeneficiario();
            return be.VerificarExistencia(CPF);
        }
    }
}
