function adicionarconvidado() {
    let valordoinput = document.querySelector("input").value;

    if (valordoinput.trim() !== "") { 
        let li = document.createElement("li");
        li.innerHTML = valordoinput + ' <i onclick="deletarconvidado(`deletado`)" class="fa-solid fa-x"></i>';

        document.querySelector("ul").appendChild(li);

        document.querySelector("input").value = ''; 

    } else {
        alert("Digite um nome antes de adicionar!"); 
    }
}

function deletarconvidado(li){
    li.parentElement.remove()
    

}