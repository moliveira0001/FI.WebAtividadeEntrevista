using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    [Serializable]
    public class BeneficiarioModel
    {
        public string Nome { get; set; }
        public string Cpf { get; set; }
    }
}