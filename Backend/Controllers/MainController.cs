using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WAS_PIXABAY.Controllers
{
    [ApiController]
    [Route("api/main")]
    public class MainController : ControllerBase
    {
        private readonly string ApiKey = "39200440-6020ae19d11f06f1da5f72633";
        private readonly int MaxOnPage = 20;
        private readonly HttpClient _httpClient;
        private string url;

        public MainController()
        {
            url = $"https://pixabay.com/api/?key={ApiKey}&per_page={MaxOnPage}";
            _httpClient = new HttpClient();
        }

        [HttpGet("image")]
        public async Task<IActionResult> Search([FromQuery] int id)
        {
            if (id == null || id < 0) return BadRequest("Invalid ID");

            url += $"&id={id}";

            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var response_content = await response.Content.ReadAsStringAsync();
                return Ok(response_content);
            }
            else return StatusCode((int)response.StatusCode, "Error fetching data");
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string content = "*",
                                                [FromQuery] int page = 1)
        {
            if (!string.IsNullOrEmpty(content)) url += $"&q={content}";
            if (page > 1) url += $"&page={page}";

            content = content.Replace(" ", "+");
            Console.WriteLine($"Searching for: {content}");

            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var response_content = await response.Content.ReadAsStringAsync();
                return Ok(response_content);
            }
            else return StatusCode((int)response.StatusCode, "Error fetching data");
        }
    }
}
