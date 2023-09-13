using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerControl : MonoBehaviour
{
    public GameObject PlayerButton;
    public GameObject bulletPosition1;
    public GameObject bulletPosition2;
    public GameObject Explosion;

    public float speed;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

        if(Input.GetKeyDown("space")){
            GameObject bullet1 = (GameObject)Instantiate(PlayerButton);
            bullet1.transform.position = bulletPosition1.transform.position;

            GameObject bullet2 = (GameObject)Instantiate(PlayerButton);
            bullet2.transform.position = bulletPosition2.transform.position;
        }

        float x = Input.GetAxisRaw("Horizontal");
        float y = Input.GetAxisRaw("Vertical");
        Vector2 direction  = new Vector2(x,y).normalized;
        Move(direction);
    }

    void Move(Vector2 direction){
        Vector2 min = Camera.main.ViewportToWorldPoint(new Vector2(0,0)); // bottom left
        Vector2 max = Camera.main.ViewportToWorldPoint(new Vector2(1,1)); // top right
        
        max.x = max.x - 0.225f; 
        min.x = min.x + 0.225f;

        max.y = max.y - 0.285f;
        min.y = min.y + 0.285f;

        Vector2 pos = transform.position;
        pos += direction * speed * Time.deltaTime;

        pos.x = Mathf.Clamp(pos.x, min.x, max.x);
        pos.y = Mathf.Clamp(pos.y, min.y, max.y);

        transform.position = pos;

    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if((col.tag=="EnemyShip") || (col.tag == "EnemyBullet"))
        {
            PlayExplosion();
            Destroy(gameObject);
        }
    }

    void PlayExplosion(){
        GameObject explosion = (GameObject)Instantiate(Explosion);
        explosion.transform.position = transform.position;
    }
}
