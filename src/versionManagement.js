var versions = {
};

function updateLoader()
{
    var loaderTypes = document.getElementsByName("loader"), loader, version;
    var versionSelect = document.getElementById("mcVersion");
    var currentVersion;
    if (versionSelect)
    {
        currentVersion = versionSelect.value;
    }
    var versionElement;
    for (var i = 0; i < loaderTypes.length; i++)
    {
        if (loaderTypes[i].checked)
        {
            loader = loaderTypes[i].value;
            break;
        }
    }
    
    if (loader)
    {
        /*
         * Reset the version select
         */
        while (versionSelect.firstChild)
        {
            versionSelect.removeChild(versionSelect.firstChild);
        }
        for (version in versions[loader])
        {
            versionElement = document.createElement("option");
            versionElement.value = version;
            versionElement.innerText = version;
            versionSelect.appendChild(versionElement);
            
            if (version == currentVersion)
            {
                versionSelect.value = currentVersion;
            }
        }
        if (currentVersion == null)
        {
            versionSelect.value = version;
        }
        updateDownload();
    }
}

function updateDownload()
{
    var loader, mcVersion;
    var downloadElement = document.getElementById("downloads");
    var downloadP, downloadSpan, downloadUrl;
    while (downloadElement.firstChild)
    {
        downloadElement.removeChild(downloadElement.firstChild);
    }
    
    var loaderTypes = document.getElementsByName("loader")
    for (var i = 0; i < loaderTypes.length; i++)
    {
        if (loaderTypes[i].checked)
        {
            loader = loaderTypes[i].value;
            break;
        }
    }
    mcVersion = document.getElementById("mcVersion").value;
    
    if (loader && mcVersion)
    {
        if (loader in versions && mcVersion in versions[loader])
        {
            modVersions = versions[loader][mcVersion];
            for (var version in modVersions)
            {
                downloadP = document.createElement("p");
                downloadSpan = document.createElement("span");
                downloadSpan.innerText = version;
                downloadUrl = document.createElement("a");
                downloadUrl.href = modVersions[version].download;
                downloadUrl.innerText = "Download";
                downloadP.appendChild(downloadSpan);
                downloadP.appendChild(downloadUrl);
                
                downloadElement.appendChild(downloadP);
            }
        }
    }
}

function loadVersionsDOM()
{
    var radio, label;
    var versionsHeader = document.getElementById("versionsHeader");
    
    var select = document.createElement("select");
    select.id = "mcVersion";
    select.addEventListener("change", updateDownload);
    
    for (var loader in versions)
    {
        radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.id = "loader-" + loader;
        radio.name = "loader";
        radio.value = loader;
        radio.addEventListener("change", updateLoader);
        
        label = document.createElement("label");
        label.setAttribute("for", radio.id);
        label.innerText = loader.charAt(0).toUpperCase() + loader.substring(1);
        
        versionsHeader.appendChild(radio);
        versionsHeader.appendChild(document.createElement("span"));
        versionsHeader.appendChild(label);
    }
    
    versionsHeader.appendChild(document.createElement("span"));
    versionsHeader.appendChild(document.createElement("span"));
    versionsHeader.appendChild(document.createElement("span"));
    versionsHeader.appendChild(document.createElement("span"));
    
    label = document.createElement("label");
    label.setAttribute("for", select.id);
    label.innerText = "Minecraft Version";
    versionsHeader.appendChild(label);
    versionsHeader.appendChild(document.createElement("span"));
    versionsHeader.appendChild(select);
    
    updateDownload();
}
            
function getModVersions()
{
    var version, tags, name;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function (e)
    {
        if (this.readyState == 4 && this.status == 200)
        {
            tags = JSON.parse(http.responseText);
            for (var i = 0; i < tags.length; i++)
            {
                name = tags[i].tag_name;
                if (name.startsWith("v"))
                {
                    
                    version = {};
                    version.name = name;
                    version.modVersion = name.substring(1, name.indexOf("-"));
                    name = name.substring(name.indexOf("-") + 1);
                    version.mcVersion = name.substring(0, name.indexOf("-"));
                    name = name.substring(name.indexOf("-") + 1);
                    if (name.indexOf("-") > -1)
                    {
                        version.loader = name.substring(0, name.indexOf("-"));
                        version.modVersion += name.substring(name.indexOf("-"));
                    }
                    else
                    {
                        version.loader = name;
                    }
                    version.download = tags[i].assets[0].browser_download_url;
                    if (!(version.loader in versions))
                    {
                        versions[version.loader] = {};
                    }
                    if (!(version.mcVersion in versions[version.loader]))
                    {
                        versions[version.loader][version.mcVersion] = {};
                    }
                    versions[version.loader][version.mcVersion][version.modVersion] = version;
                }
            }
            loadVersionsDOM();
        }
    }
    url = "https://api.github.com/repos/Markil3/MinecraftImmersiveHUD/releases";
    http.open("GET", url);
    http.send();
}
