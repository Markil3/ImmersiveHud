function flipButton(image, direction)
{
    var prefix = image.getAttribute("prefix");
    var min = parseInt(image.getAttribute("min"));
    var max = parseInt(image.getAttribute("max"));
    var current = parseInt(image.getAttribute("current"));
    if (isNaN(min))
    {
        min = 1;
    }
    if (isNaN(max))
    {
        max = min;
    }
    if (isNaN(current))
    {
        current = min;
    }
    else
    {
        if (direction)
        {
            if (++current > max)
            {
                current = min;
            }
        }
        else
        {
            if (--current < min)
            {
                current = max;
            }
        }
    }
    image.setAttribute("current", current);
    image.setAttribute("src", prefix + current + ".png");
}

function flipButtonPrev(event)
{
    flipButton(event.originalTarget.nextElementSibling, false);
}

function flipButtonNext(event)
{
    flipButton(event.originalTarget.previousElementSibling, true);
}
