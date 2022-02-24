export default function BtnRemoveDataPosition (el, localTransactions){
    if(localTransactions.length < 9){
        return
    }else{
        el.classList.remove('remove-data-initial');
        el.classList.add('remove-data');
    }
}