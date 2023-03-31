package toy.project.minigame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * fileName : HomeController
 * author   : pilming
 * date     : 2023-04-01
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "miniGameHome";
    }

    @GetMapping("/snake")
    public String snakeGame() {
        return "snake";
    }

    @GetMapping("/ballDodge")
    public String ballDodge() {
        return "ballDodge";
    }
}
