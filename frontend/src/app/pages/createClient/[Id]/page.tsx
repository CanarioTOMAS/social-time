"user client"

import FormClient from "@/features/client/components/FormClient/FormClient"

export default function createClient({params}: {params: {id: string}}) {

    return(
        <FormClient client={undefined}/>
    )
}