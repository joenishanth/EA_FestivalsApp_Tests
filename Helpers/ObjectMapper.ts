
export function FestivalObjectMapper(festivalData: festivals[]): UIDataFormat[] {

    let festivalNames: string[] = [];
    let recordLabels: string[] = [];

    // build FestivalNames and RecordLabels List
    festivalData.forEach(element => {

        festivalNames.push(element.name);
        element.bands.forEach(b => {

            if (b.recordLabel === '') {
                b.recordLabel = 'Un Labelled Troops'
            }
            recordLabels.push(b.recordLabel)
            recordLabels.sort()
        })
        festivalNames.sort()

    });

    //#region Logic to convert API object Type to UI Object Type for verification
    let uniqueRecordLabels = recordLabels.filter((item, index) => recordLabels.indexOf(item) === index);


    let actualDataCont: UIDataFormat[] = []
    // Create a new PortalData
    uniqueRecordLabels.forEach(rl => {
        let newRecordData: UIDataFormat = {
            recordLabel: rl,
            bands: []
        }
        actualDataCont.push(newRecordData)

        // Iterate by festival names (sorted in ascending order)
        for (let i = 0; i < festivalNames.length; i++) {
            let f = festivalData.filter(x => x.name === festivalNames[i])[0];

            //Sorts the bands object in ascending order
            f.bands.sort((a, b) => a.name.localeCompare(b.name));

            //iterate trough each band
            for (let j = 0; j < f.bands.length; j++) {

                //Add/update band if the band object has record label
                if (f.bands[j].recordLabel === rl) {

                    // Add just festival name if the band name aleardy exists
                    if (newRecordData.bands.some(b => b.name === f.bands[j].name)) {
                        newRecordData.bands.filter(b => b.name === f.bands[j].name)[0].festivals.push(festivalNames[i])
                    }

                    //Add band object including festival name
                    else {
                        let newband: eaPortalBand = {
                            name: f.bands[j].name,
                            festivals: [festivalNames[i]]
                        }
                        newRecordData.bands.push(newband)
                    }

                }
            }
        }
    })
    return actualDataCont
}