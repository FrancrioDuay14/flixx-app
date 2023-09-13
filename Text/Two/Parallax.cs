using UnityEngine;

public class Parallax : MonoBehaviour
{
    private Material material;
    public Vector2 animationSpeed = new Vector2(0f, -0.03f);

    private void Awake()
    {
        Renderer renderer = GetComponent<Renderer>();
        if (renderer != null)
        {
            material = renderer.material;
        }
        else
        {
            Debug.LogWarning("No renderer found!");
            enabled = false;
        }
    }

    private void Update()
    {
        if (material != null)
        {
            Vector2 offset = material.mainTextureOffset + animationSpeed * Time.deltaTime;
            material.mainTextureOffset = offset;
        }
    }

}
