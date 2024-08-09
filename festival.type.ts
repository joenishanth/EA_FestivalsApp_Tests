type festivals = {
    name: string;
    bands: band[];
};

type band = {
    name: string;
    recordLabel: string;
}


type UIDataFormat = {
    recordLabel: string;
    bands: eaPortalBand[];
}

type eaPortalBand = {
    name: string;
    festivals: string[];
}