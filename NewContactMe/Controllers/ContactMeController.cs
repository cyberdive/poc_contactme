using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using NewContactMe.Models;

namespace NewContactMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactMeController : ControllerBase
    {
        private readonly string _connectionString;

        public ContactMeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySQL");
        }

        [HttpGet("{clientNumber}")]
        public ActionResult<Client> Get(string clientNumber)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();
                    using (MySqlCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "SELECT * FROM contactme.clients WHERE ClientNumber = @clientNumber";
                        command.Parameters.Add(new MySqlParameter("@clientNumber", MySqlDbType.VarChar, 255) {Value = clientNumber});
                        command.Prepare();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                                return Ok(MapClient(reader));
                        }
                    }
                }

                return NotFound(clientNumber);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("{clientNumber}")]
        public ActionResult<Client> Update(string clientNumber, UpdateEmailRequest updateEmailRequest)
        {
            if (string.IsNullOrWhiteSpace(updateEmailRequest.Email))
                return BadRequest("Email address cannot be empty.");
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();
                    using (MySqlCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "UPDATE contactme.clients SET Email = @email, Alert = @alert WHERE ClientNumber = @clientNumber";
                        command.Parameters.Add(new MySqlParameter("@email", MySqlDbType.VarChar, 255) { Value = updateEmailRequest.Email });
                        command.Parameters.Add(new MySqlParameter("@alert", MySqlDbType.Int32) { Value = Convert.ToInt32(updateEmailRequest.Alert) });
                        command.Parameters.Add(new MySqlParameter("@clientNumber", MySqlDbType.VarChar, 255) { Value = clientNumber });
                        command.Prepare();

                        if (command.ExecuteNonQuery() == 0)
                        {
                            return NotFound(clientNumber);
                        }
                        else
                        {
                            return Ok();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        private Client MapClient(MySqlDataReader reader)
        {
            return new Client
            {
                ClientNumber = reader.GetString("ClientNumber"),
                LastName = reader.GetString("LastName"),
                FirstName = reader.GetString("FirstName"),
                BirthDate = reader.GetDateTime("BirthDate").Date,
                Email = reader.GetString("Email"),
                Alert = reader.GetBoolean("Alert")
            };
        }
    }
}
