import Realm from 'realm'

export async function OpenRealmSess(realmRef) {
    let realm = await Realm.open(realmRef.dataModel)

    return {
        schemaName: String(realmRef.dataModel.schema[0].name),
        realm: realm
    }
}

export function GetRealmObjs(realmSession = {schemaName: "", realm: new Realm()}) {
    return realmSession.realm.objects(realmSession.schemaName)
}

export function GetConvertedRealmValueToTypeData(objWithValue = {}) {
    let objWithTypeData = objWithValue

    Object.keys(objWithTypeData).forEach((key) => {
        if(Object.is(objWithTypeData[key], "")) {
            objWithTypeData[key] = "string"
        } else if(objWithTypeData[key] === 0) {
            objWithTypeData[key] = "int"
        }
    })

    return objWithTypeData
}