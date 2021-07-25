namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string detais = null)
        {
            StatusCode = statusCode;
            Message = message;
            Detais = detais;
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        public string Detais { get; set; }
    }
}