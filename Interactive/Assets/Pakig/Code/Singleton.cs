using UnityEngine;

namespace Sapphus
{
    public abstract class Singleton<T> : MonoBehaviour where T : MonoBehaviour
    {
        private static T _instance = null;
        public static T Instance
        {
            get
            {
                if (_instance == null && !_applicationIsQuiting)
                {
                    _instance = FindObjectOfType<T>();
                    if (_instance == null)
                    {
                        GameObject newObject = new GameObject("Singleton");
                        _instance = newObject.AddComponent<T>();
                    }
                }

                return _instance;
            }
        }

        protected static bool _applicationIsQuiting = false;

        private void OnApplicationQuit()
        {
            _applicationIsQuiting = true;
        }
    }
}
