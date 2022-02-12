function copyToClipboard(text, alertText, errorText)
{
    if (!navigator.clipboard)
    {
        const elem = document.createElement('textarea');
        elem.value = text;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
        alert(alertText);
    }
    else
    {
        navigator.clipboard.writeText(text).then(
            function ()
            {
                alert(alertText); // success 
            })
            .catch
            (
                function ()
                {
                    alert(errorText); // error
                }
            );
    }
}