using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Data;


namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal long Incluir(DML.Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome));      
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.Cpf.Replace(".", "").Replace("-", "")));

            DataSet ds = base.Consultar("FI_SP_IncBenef", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);

            return ret;
        }


        internal List<DML.Beneficiario> Listar(long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", id));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<DML.Beneficiario> cli = Converter(ds);

            return cli;
        }

        private List<DML.Beneficiario> Converter(DataSet ds)
        {
            List<DML.Beneficiario> lista = new List<DML.Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Beneficiario cli = new DML.Beneficiario();
                    cli.Id = row.Field<long>("ID");                   
                    cli.Nome = row.Field<string>("Nome");                  
                    cli.Cpf = row.Field<string>("CPF").Insert(3, ".").Insert(7, ".").Insert(11, "-");
                    lista.Add(cli);
                }
            }

            return lista;
        }
    }
}
