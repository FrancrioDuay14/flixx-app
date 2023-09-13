using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Text scoreText;
    private int score = 0;
    // Start is called before the first frame update
    void Start()
    {
        UpdateScoreText();
    }

    // Scoring , Score Text
    public void AddScore(int amount){  // Kung ilang points kapag na destroy mo yung isang coin
        score += amount;
        UpdateScoreText();
    }

    void UpdateScoreText(){
        scoreText.text = "Score: " + score;

    }

}
