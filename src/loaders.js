function initFlipImages(images)
{
    var image;
    for (var i = 0; i < images.length; i++)
    {
        image = images[i];
        if (!image.hasAttribute("src") && image.hasAttribute("prefix"))
        {
            if (image.hasAttribute("current"))
            {
                image.setAttribute("src", image.getAttribute("prefix") + image.getAttribute("current") + ".png");
            }
            else if (image.hasAttribute("min"))
            {
                image.setAttribute("current", image.getAttribute("min"));
                image.setAttribute("src", image.getAttribute("prefix") + image.getAttribute("current") + ".png");
            }
        }
    }
}

function setupButtons(flipButtons)
{
    var button;
    for (var i = 0; i < flipButtons.length; i++)
    {
        button = flipButtons[i];
        if (button.classList.contains("prev"))
        {
            button.addEventListener("click", flipButtonPrev);
        }
        else if (button.classList.contains("next"))
        {
            button.addEventListener("click", flipButtonNext);
        }
    }
    
}
            
window.onload = function () {
    initFlipImages(document.getElementsByTagName("img"));
    setupButtons(document.getElementsByClassName("imgFlip"));
    
    getModVersions();
}
