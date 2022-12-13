using UnityEngine.Events;
using UnityEngine.UI;
using Sapphus.Audio;

namespace Sapphus.Util
{
    public class ClickButton : Button
    {
        public void addListener(UnityAction call)
        {
            onClick.AddListener(call);
            onClick.AddListener(clickSound);
        }

        public void removeListener(UnityAction call)
        {
            onClick.RemoveListener(call);
            onClick.RemoveListener(clickSound);
        }

        private void clickSound()
        {
            AudioManager.Instance.PlaySound("Button Click");
        }
    }
}

