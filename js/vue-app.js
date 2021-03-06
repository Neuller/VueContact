var vue = new Vue({
  el : "#app",  

  data : {
    error : {name : "*", email : "*", subject : "*", message : "*"},
    contact : { name : "", email : "", subject : "", message : ""},
    urlPost : "http://localhost/VUE-TUTORIAL/app/contact.php",
    disabledButton : false,
    messageResult : ""
  },

  methods : {
    Send : function(){
      if(this.ValidateForm()){
        this.disabledButton = true;
        this.messageResult = "Sending, please wait!";

        var form = this.formData(this.contact);
        axios.post(this.urlPost, form).then(function(response){
          console.log(response.data);
          if(response.data == "send"){
            vue.ResetForm();
            vue.ResetError();
            vue.messageResult  = "Message sent successfully";
            vue.disabledButton = false;
          }else{
             vue.messageResult = "We were unable to send you your message, please try again later.";
          }
        });
      }
    },
    formData : function(obj){
      var formData = new FormData();
      for(var key in obj){
        formData.append(key, obj[key]);
      }
      return formData;
    },
    ValidateForm : function(){
      var error = 0;
      this.ResetError();
      if(this.contact.name.length < 4){
        this.error.name = "Por favor, insira um nome valido (4 caracteres)";
        error++;
      }

      if(this.contact.email.indexOf("@") < 0){
        this.error.email = "Email invalido";
        error++;
      }

      if(this.contact.subject.length < 10){
        this.error.subject = "Mensagem invalida (10 caracteres)";
        error++;
      }

      if(this.contact.message.length < 10){
        this.error.message = "Mensagem invalida (10 caracteres)";
        error++;
      }
      return (error === 0);
    },
    ResetForm : function(){
      this.contact.name = "";
      this.contact.email = "";
      this.contact.subject = "";
      this.contact.message = "";
    },
    ResetError : function(){
      this.error.name = "*";
      this.error.email = "*";
      this.error.subject = "*";
      this.error.message = "*";
    },
    OpenForm : function(show){
      if(show){
        $("#dvForm").show("slow");
        this.ResetForm();
        this.ResetError();
      }
      else{
        $("#dvForm").hide("slow");
      }
    }
  }
});
