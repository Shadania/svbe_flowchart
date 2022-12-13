using UnityEngine;

namespace Sapphus
{
    public class GameManager : MonoBehaviour
    {
        [HideInInspector] public static GameManager SharedInstance;

        private void Awake()
        {
            if (SharedInstance == null)
            {
                SharedInstance = this;
            }
            else
            {
                Debug.LogWarning("There are multiple game managers in this scene!");
            }
        }

        private void Start()
        {
            //Target for 60 fps
            Application.targetFrameRate = 60;
        }

        private void Update()
        {

        }
    }
}
