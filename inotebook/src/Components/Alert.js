import React from 'react'

export default function Alert(props) {
    const capatilize = (word)=>{
        if (!word) {
            return ;
          }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
  props.alert &&  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{capatilize(props.alert.type)}</strong>:{props.alert.msg}
  
</div>
  )
}