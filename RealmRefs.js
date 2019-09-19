import {
    GetConvertedRealmValueToTypeData
} from './Realm'

export function RealmRefs() {
    let paramSchemas = {
        Word: { value: "" },
        Profile: {email: "", umur: 0},
        Kuota: {datakuota: 0, waktu : 0},
        Kritik: {saran : ""},
        Pulsa: {jumlahpulsa: 0, waktu : 0, tempat : ""},
        harga: {hargaKuota : 0}
    }

    return {
        Word: {
            parameters: paramSchemas.Word,
            dataModel: {
                path: "word.realm",
                schema: [{
                    name: "word_v1",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.Word)
                }],
            },
            InitValue: (params = paramSchemas.Word) => params
        },
        Profile: {
            parameters: paramSchemas.Profile,
            dataModel: {
                path: "profile.realm",
                schema: [{
                    name: "profile_v1",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.Profile)
                }],
            },
            InitValue: (params = paramSchemas.Profile) => params
        },
        Kuota :{
            parameters: paramSchemas.Kuota,
            dataModel:  {
                path : "kuota.realm",
                schema : [{
                    name : "kuota_v8",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.Kuota)
                }]
            },
            InitValue: (params = paramSchemas.Kuota) => params
        },
        Kritik :{
            parameters: paramSchemas.Kritik,
            dataModel:  {
                path : "kritik.realm",
                schema : [{
                    name : "kritik_v5",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.Kritik)
                }]
            },
            InitValue: (params = paramSchemas.Kritik) => params
        },
        Pulsa :{
            parameters: paramSchemas.Pulsa,
            dataModel:  {
                path : "pulsa.realm",
                schema : [{
                    name : "pulsa_v8",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.Pulsa)
                }]
            },
            InitValue: (params = paramSchemas.Pulsa) => params
        },
        harga :{
            parameters: paramSchemas.harga,
            dataModel:  {
                path : "harga.realm",
                schema : [{
                    name : "harga_v2",
                    properties: GetConvertedRealmValueToTypeData(paramSchemas.harga)
                }]
            },
            InitValue: (params = paramSchemas.harga) => params
        },
    }
}