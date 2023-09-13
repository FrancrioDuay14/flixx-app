using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Coin : MonoBehaviour
{

    private GameManager gameManager;

    void Start(){
        gameManager = FindObjectOfType<GameManager>();
    }

    void OnTriggerEnter2D(Collider2D collider){
        if(collider.CompareTag("Player")){
            // Debug.Log("Destroyed!");
            gameManager.AddScore(5);
            Destroy(gameObject);
        }
    }

}
